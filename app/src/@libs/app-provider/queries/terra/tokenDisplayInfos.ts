import { useTerraNetwork } from '@anchor-protocol/app-provider';
import { TokenDisplayInfo, tokenDisplayInfosQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { TERRA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(tokenDisplayInfosQuery);

export function useTokenDisplayInfosQuery(
  networkName?: string,
): UseQueryResult<TokenDisplayInfo[]> {
  const network = useTerraNetwork();
  const { queryErrorReporter } = useApp();

  const result = useQuery(
    [TERRA_QUERY_KEY.TERRA_TOKEN_DISPLAY_INFOS, networkName ?? network.name],
    queryFn,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
