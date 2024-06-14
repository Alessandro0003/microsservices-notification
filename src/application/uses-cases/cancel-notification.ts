import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
