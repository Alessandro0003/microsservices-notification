import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { makeNotification } from '@test/factories/notifications-factory'
import { UnreadNotification } from './unread-notification'

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()

    const unreadNotification = new UnreadNotification(notificationRepository)

    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()

    const unreadNotification = new UnreadNotification(notificationRepository)

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})
