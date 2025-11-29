import type { Receipe } from "../models/Receipe";

export class ReceipeService {
  private static receipes: Receipe[] = [
    {
      id: "AA0012",
      name: "Butter Chicken",
      imageUrl:
        "https://images.immediate.co.uk/production/volatile/sites/2/2015/12/18032.jpg?quality=90&resize=600%2C400",
      ingredients: ["chicken", "butter", "Red Chilli"],
      description:
        "To make Masala Chicken, first thoroughly wash the chicken under running water. Now put it in some warm salted water and allow it to rest for 10 minutes and throw the water away and wash again. This helps to remove the smell of the chicken.",
    },
    {
      id: "AA0013",
      name: "Chicken Masala",
      imageUrl:
        "https://static.toiimg.com/thumb/54673639.cms?imgsize=497063&width=800&height=800",
      ingredients: ["chicken", "Masala", "Red Chilli"],
      description:
        "Add oil and ghee in pan and heat over medium flame. When the oil is hot enough, add bay leaves and both the cardamom and cinnamon. Saute for a minute and then add finely chopped onion into it. Cook till onions turn pink. Then add the ginger-garlic paste. Fry for a minute and then add chicken pieces in it. Cook chicken for 2-3 minutes until it turns white.",
    },
    {
      id: "AA0014",
      name: "Chicken Tikka",
      imageUrl:
        "https://irepo.primecp.com/2016/03/270613/recipe-27720_Large600_ID-1540466.jpg?v=1540466",
      ingredients: ["chicken", "butter", "Red Chilli", "Garlic"],
      description:
        "Quickly, add red chilli powder, coriander powder, turmeric, cumin powder, and salt to taste. Stir to mix all the ingredients well with the chicken. Cook for a minute and then add finely chopped tomatoes and green chillies (slit and halved). Now reduce the flame and cook covered for 6-7 minutes and then uncovered till the chicken is browned.",
    },
  ];

  public static getReceipes(): Receipe[] {
    return ReceipeService.receipes;
  }

  public static getReceipe(receipeId: string): Receipe | undefined {
    return ReceipeService.receipes.find((receipe) => {
      return receipe.id === receipeId;
    });
  }
}
