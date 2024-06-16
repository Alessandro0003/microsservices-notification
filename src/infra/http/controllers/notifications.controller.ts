import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/uses-cases/send-notification';
import { NotificationMapper } from '../mappers/notification-mapper';
import { CancelNotification } from '@application/uses-cases/cancel-notification';
import { ReadNotification } from '@application/uses-cases/read-notification';
import { UnreadNotification } from '@application/uses-cases/unread-notification';
import { CountRecipientNotification } from '@application/uses-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/uses-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification, 
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    }) 
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise< { count: number} > {
    const { count } = await this.countRecipientNotification.execute({
      recipientId
    })

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {
      notifications: notifications.map(NotificationMapper.toHTTP)
    }
  }


  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    }) 
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationMapper.toHTTP(notification),
    };
  }
}
