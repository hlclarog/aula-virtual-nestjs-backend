import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChannelsService } from '../channels/channels.service';
import { CLIENTS_PROVIDER } from './clients.dto';
import { Clients } from './clients.entity';

@Injectable()
export class ClientsService {
  @Inject(CLIENTS_PROVIDER) repository: Repository<Clients>;

  constructor(private channelsService: ChannelsService) {}

  async create(socket: string, channel: string) {
    const client = await this.repository.findOne({ socket });
    await this.channelsService.create(socket, channel);
    if (!client) {
      await this.repository.save({ socket, channel });
    }
  }

  async findAll(): Promise<Clients[]> {
    return await this.repository.find();
  }

  async remove(socket: string) {
    const client = await this.repository.findOne({ socket });
    await this.channelsService.removeClient(socket, client.channel);
    await this.repository.delete({ socket });
  }

  async removeAll() {
    await this.repository.remove(await this.repository.find());
  }
}
