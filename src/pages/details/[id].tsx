import CardDetail from '@/components/card-detail/CardDetail';
import Layout from '@/pages/layout';
import { wrapper } from '@/store/store';
import { SpellsApi, getOneSpell, getSpells } from '@/store/api/SpellsApi';
import { checkRouterElement } from '@/utils/functions';

const Details = (props) => {
  const { spellsData, spellData } = props;
  return (
    <Layout data={spellsData}>
      <CardDetail spellData={spellData} />
    </Layout>
  );
};
export default Details;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, limit, search, id } = context.query;

    const spells = await store.dispatch(
      getSpells.initiate({
        page: checkRouterElement(page, '1'),
        limitPerPage: checkRouterElement(limit, '10'),
        searchWord: checkRouterElement(search, ''),
      })
    );
    const spell = await store.dispatch(
      getOneSpell.initiate({
        id: checkRouterElement(id, ''),
      })
    );

    await Promise.all(store.dispatch(SpellsApi.util.getRunningQueriesThunk()));

    return {
      props: {
        spellsData: spells?.data,
        spellData: spell?.data,
      },
    };
  }
);
