export function jobIdCreator(id: string, createdAt: string) {
  return `JP-${new Date(createdAt).getFullYear()}-${id
    .slice(-4)
    .toUpperCase()}`;
}
