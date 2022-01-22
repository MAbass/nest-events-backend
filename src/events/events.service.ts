import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async create(createEventDto: CreateEventDto) {
    const user: UserEntity = await this.userRepository.findOne({ id: createEventDto.userId });
    if (!user)
      throw new NotFoundException();

    return this.eventRepository.save({
      name: createEventDto.name,
      address: createEventDto.address,
      when: createEventDto.when,
      description:createEventDto.description,
      user:user
    });
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
