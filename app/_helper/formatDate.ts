import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const diffInSeconds = (Date.now() - date.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return 'menos de 1 min';
  }

  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
};