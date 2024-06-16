import { NotificationsRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
