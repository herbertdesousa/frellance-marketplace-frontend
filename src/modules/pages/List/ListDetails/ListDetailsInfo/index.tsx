import { Page } from '@/types/Page';

import useSWR from 'swr';
import { useAuth } from '@/hooks/auth';

import ListDetailsInfoAnalytics from './ListDetailsInfoAnalytics';

import ListDetailsInfoContact from './ListDetailsInfoContact';

export interface Analytics {
  views: number;
  requestContacts: number;
}

interface Props {
  itemId: string;
  userId: string;
}

const ListDetailsInfo: Page<Props> = ({ itemId, userId }) => {
  const { user } = useAuth();
  const { data } = useSWR<Analytics | undefined>(
    user && `categories/items/details/analytics?id=${itemId}`,
    { revalidateOnFocus: false },
  );

  return (
    <>
      {!data && <ListDetailsInfoContact itemId={itemId} userId={userId} />}
      {data && <ListDetailsInfoAnalytics data={data} itemId={itemId} />}
    </>
  );
};

export default ListDetailsInfo;
