import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {
  }

  create(createEventDto: CreateEventDto) {
    return this.eventRepository.save(createEventDto);
  }

  findAll() {
    return this.eventRepository.find({});
  }

  findOne(id: string) {
    return this.eventRepository.findOne({ id: id });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne({ id: id });
    if (!event) {
      throw new NotFoundException();
    }
    return this.eventRepository.remove(event);
  }
}
