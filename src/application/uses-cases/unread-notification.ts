import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notification-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'

interface UnreadNotificationRequest {
  notificationId: string
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request

    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }

    notification.unread()

    await this.notificationRepository.save(notification)
  }
}
