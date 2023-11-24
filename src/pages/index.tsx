import Layout from './layout';
import { wrapper } from '@/store/store';
import { SpellsApi, getSpells } from '@/store/api/SpellsApi';
import { checkRouterElement } from '@/utils/functions';

export default function Home(data) {
  const newData = data.cards.data;
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, limit, search } = context.query;
    const data = await store.dispatch(
      getSpells.initiate({
        page: checkRouterElement(page, '1'),
        limitPerPage: checkRouterElement(limit, '10'),
        searchWord: checkRouterElement(search, ''),
      })
    );

    await Promise.all(store.dispatch(SpellsApi.util.getRunningQueriesThunk()));
    return {
      props: {
        cards: data,
      },
    };
  }
);
