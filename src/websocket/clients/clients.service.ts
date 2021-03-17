import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChannelsService } from '../channels/channels.service';
import { CLIENTS_PROVIDER } from './clients.dto';
import { Clients } from './clients.entity';

@Injectable()
export class ClientsService {
  @Inject(CLIENTS_PROVIDER) repository: Repository<Clients>;

  constructor(private channelsService: ChannelsService) {}

  async findUser(user_id) {
    return await this.repository.findOne({ user_id });
  }

  async create(socket: string, channel: string, user_id?: string) {
    let client = await this.repository.findOne({ socket });
    if (user_id) {
      client = await this.repository.findOne({ user_id });
    }
    await this.channelsService.create(socket, channel);
    if (!client) {
      await this.repository.save({
        socket,
        channel,
        user_id: user_id ? user_id : null,
      });
    } else {
      this.repository.update(client.id, {
        socket,
      });
    }
  }

  async findAll(): Promise<Clients[]> {
    return await this.repository.find();
  }

  async remove(socket: string) {
    const client = await this.repository.findOne({ socket });
    if (client) {
      await this.channelsService.removeClient(socket, client.channel);
    }
    await this.repository.delete({ socket });
  }

  async removeAll() {
    await this.repository.remove(await this.repository.find());
  }
}
