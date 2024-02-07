import { inject, injectable } from 'tsyringe';
import redisCache from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
// import { IProduct } from '../domain/models/IProduct';
import { IProductPaginate } from '../domain/models/IProductPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    // let products = await redisCache.recover<IProduct[]>(
    //   'api-vendas-PRODUCT_LIST',
    // );

    // if (!products) {
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    await redisCache.save('api-vendas-PRODUCT_LIST', products);
    // }

    return products;
  }
}

export default ListProductService;
