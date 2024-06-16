import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notifications-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients notification', () => {
  it('should be able to get recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotification(notificationRepository);

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1' }));

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1' }));

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-2' }));

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ])
    );
  });
});
