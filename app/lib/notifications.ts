import { fetchApi } from './api';

export interface Notification {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt?: string | null;
  canceledAt?: string | null;
  createdAt: string;
}

export interface CreateNotificationData {
  recipientId: string;
  content: string;
  category: string;
}

/**
 * Serviço de notificações para interação com o backend NestJS.
 */
export const notificationsService = {
  /**
   * Cria uma nova notificação.
   */
  async create(data: CreateNotificationData): Promise<{ notification: Notification }> {
    return fetchApi<{ notification: Notification }>('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Lista todas as notificações de um destinatário específico.
   */
  async getFromRecipient(recipientId: string): Promise<{ notifications: Notification[] }> {
    return fetchApi<{ notifications: Notification[] }>(`/notifications/from/${recipientId}`);
  },

  /**
   * Conta o número de notificações de um destinatário.
   */
  async countFromRecipient(recipientId: string): Promise<{ count: number }> {
    return fetchApi<{ count: number }>(`/notifications/count/from/${recipientId}`);
  },

  /**
   * Marca uma notificação como lida.
   */
  async read(id: string): Promise<void> {
    return fetchApi<void>(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Marca uma notificação como não lida.
   */
  async unread(id: string): Promise<void> {
    return fetchApi<void>(`/notifications/${id}/unread`, {
      method: 'PATCH',
    });
  },

  /**
   * Cancela uma notificação.
   */
  async cancel(id: string): Promise<void> {
    return fetchApi<void>(`/notifications/${id}/cancel`, {
      method: 'PATCH',
    });
  },
};
