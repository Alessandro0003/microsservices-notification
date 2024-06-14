import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('New friend request'),
      recipientId: 'example-recipient-id',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancle a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);
    
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
