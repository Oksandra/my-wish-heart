# Wishlist Hub

Создаем страницу для просмотра Избранного как на маркетплейсах, url адрес wishlist. Страница содержит две вкладки Избранное и Избранные поставщики. Избранные поставщики пока делаем пустой, позже добавим логику. Избранное содержит карточки товаров, в соответствии лучшими практиками. Максимальный контейнер 1344px на десктоп версии, помещается 5 карточек. 
За основу дизайна карточек берем существующую страницу сайта (скрин 1). Убираем шильдики с количеством заказов, не отображаем их на странице виш листа. Показывать товары по дате добавления , то есть будут товары, которые сейчас в наличии. Товары, которых нет в наличии. Их выделить серыми и приглушенными с подписью, что нет в наличии (скрин 2). И третий вариант отображения карточек, когда данного размера нет в наличии, например, показываем вместо даты доставки кнопку Другие варианты. В избранном аналогично скрину 3  показывать размер, который добавлен в корзину .

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://my-wish-heart.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69aa93de-5822-42b4-8647-2746f465a570).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
