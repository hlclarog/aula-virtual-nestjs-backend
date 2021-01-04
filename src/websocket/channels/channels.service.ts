import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CHANNELS_PROVIDER } from './channels.dto';
import { Channels } from './channels.entity';

@Injectable()
export class ChannelsService {
  @Inject(CHANNELS_PROVIDER) repository: Repository<Channels>;

  async create(client: string, name: string) {
    const channel = await this.repository.findOne({ name: name });
    if (!channel) {
      await this.repository.save({
        name: name,
        clients: [client],
      });
    } else {
      const idx = channel.clients.map((c) => c).indexOf(client);
      const clients = Object.assign([], channel.clients);
      clients.push(client);
      if (idx == -1) {
        await this.repository.update(channel.id, {
          clients,
        });
      }
    }
  }

  async findAll(): Promise<Channels[]> {
    return await this.repository.find();
  }

  async removeClient(socket: string, channel: string) {
    const channelData = await this.repository.findOne({ name: channel });
    if (channelData) {
      const idx = channelData.clients.map((c) => c).indexOf(socket);
      if (idx >= 0) {
        const clients = Object.assign([], channelData.clients);
        clients.splice(idx, 1);
        await this.repository.update(channelData.id, {
          clients,
        });
      }
    }
  }

  async remove(name: string) {
    await this.repository.delete(name);
  }

  async removeAll() {
    await this.repository.remove(await this.repository.find());
  }
}
