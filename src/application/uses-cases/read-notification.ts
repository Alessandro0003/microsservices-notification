import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notification-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }

    notification.read()

    await this.notificationRepository.save(notification)
  }
}
