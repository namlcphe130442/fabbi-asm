type Dish = {
  id: number,
  name: string,
  restaurant: string,
  availableMeals: Array<string>,
}

type Meal = {
  id: number,
  name: string,
}

type Restaurant = {
  name: string,
}

type Step = {
  id: string,
}

type Order = {
  id: string,
  name: string|null,
  numOfDish: number,
}

type OrderDetail = {
  meal: Meal,
  people: number,
  restaurant: string,
  dishes: Array<Order>,
}