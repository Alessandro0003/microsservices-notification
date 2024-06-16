import { NotificationsRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(recipientId);

    return {
      count,
    };
  }
}
