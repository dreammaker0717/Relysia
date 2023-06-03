import useTokens from 'hooks/useTokens'

export default function useNFTs() {
  const { tokens, ...rest } = useTokens()
  const nfts = tokens.filter(({ splittable, sn }) => !splittable && sn !== 0)
  return { nfts, ...rest }
}
