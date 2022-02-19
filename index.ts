interface PlanData {
  [key: string]: number;
  users: number;
  groups: number;
  emails: number;
  documents: number;
  fileSize: number;
}

interface Plan {
  type: "plan";
  name: string;
  price: number;
  data: PlanData;
}

//all possible plans
const plans: Plan[] = [
  {
    name: "Tiny",
    price: 5.99,
    type: "plan",
    data: {
      users: 15,
      groups: 10,
      emails: 150,
      documents: 75,
      fileSize: 2.5,
    },
  },
  {
    name: "Small",
    price: 7.99,
    type: "plan",
    data: {
      users: 25,
      groups: 20,
      emails: 500,
      documents: 150,
      fileSize: 5,
    },
  },
  {
    name: "Medium",
    price: 14.99,
    type: "plan",
    data: {
      users: 50,
      groups: 35,
      emails: 1000,
      documents: 250,
      fileSize: 25,
    },
  },
  {
    name: "Large",
    price: 20.99,
    type: "plan",
    data: {
      users: 100,
      groups: 50,
      emails: 2500,
      documents: 500,
      fileSize: 500,
    },
  },
];

//get the smallest possible plan for the user
function getSmallestPlan(data: PlanData): Plan | "custom" {
  //set the start value of smallestPlan to the biggest plan (custom plan)
  let smallestPlanName = "custom";

  //sort the plans from expensive to cheap
  const sortedPlans = plans.sort((a, b) => b.price - a.price);

  //get all properties of a plan
  const properties = Object.keys(sortedPlans[0].data);

  //go through all plans
  for (let i = 0; i < sortedPlans.length; i++) {
    //set a var which keeps track if all properties match the plan
    let isOkay = true;

    //set a shorthand for the current plan
    const plan = plans[i];

    //go through all properties
    for (let j = 0; j < properties.length; j++) {
      //set a shorthand for the current property
      const property = properties[j];

      //check if a property is too much for a plan
      if (data[property] > plan.data[property]) isOkay = false;
    }

    //check if the current plan is okay (if update smallestPlan to current)
    if(isOkay) smallestPlanName = plan.name
  }

  //find the full smallestPlan from the smallestPlan Name
  const fullSmallestPlan = plans.find((plan) => plan.name === smallestPlanName);

  //return the smallest calculated plan or when no plan is big enough return "custom"
  return fullSmallestPlan ? fullSmallestPlan : "custom";
}

// calculate the smallest possible plan
const plan = getSmallestPlan({
  users: 16,
  groups: 10,
  emails: 150,
  documents: 75,
  fileSize: 2.5,
});

//format and log the plan
console.log(
  "We recommend " +
    (plan === "custom"
      ? "a custom plan"
      : `the ${plan.name} plan for ${plan.price}/mo`) +
    " for your usage!",
);
