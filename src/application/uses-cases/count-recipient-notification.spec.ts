import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notifications-factory';

describe('Count recipients notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(notificationRepository);

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1' }));

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1' }));

    await notificationRepository.create(makeNotification({ recipientId: 'recipient-2' }));

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
