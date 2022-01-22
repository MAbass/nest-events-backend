import { Body, Controller, Get, Inject, Logger, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { AuthGuardJwt } from "../auth/guards/auth.guard.jwt";
import { RoleEnum } from "../user/enum/role.enum";
import { RolesDecorators } from "../auth/decorators/roles.decorators";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CheckPermissions } from "../auth/decorators/check.permissions";
import { PermissionsGuard } from "../auth/guards/permission.guard";
import { PermissionAction } from "../auth/enum/permission.action";

@Controller("api/events")
export class EventsController {
  private readonly logger: Logger = new Logger(EventsController.name);

  constructor(@Inject(EventsService) private readonly eventsService: EventsService) {
  }

  @Post()
  @UseGuards(AuthGuardJwt, RolesGuard, PermissionsGuard)
  @RolesDecorators(RoleEnum.USER)
  @CheckPermissions([PermissionAction.POST, "Event"])
  create(@Body(ValidationPipe) createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseGuards(AuthGuardJwt, PermissionsGuard)
  @CheckPermissions([PermissionAction.GET, "Event"])
  findAll() {
    return this.eventsService.findAll();
  }

  /* @Get(":id")
   findOne(@Param("id", ParseUUIDPipe) id: string) {
     return this.eventsService.findOne(id);
   }

   @Patch(":id")
   update(@Param("id", ParseUUIDPipe) id: string, @Body() updateEventDto: UpdateEventDto) {
     return this.eventsService.update(id, updateEventDto);
   }

   @Delete(":id")
   remove(@Param("id", ParseUUIDPipe) id: string) {
     return this.eventsService.remove(id);
   }*/
}
