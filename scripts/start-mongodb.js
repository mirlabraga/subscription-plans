let error = true

let res = [
  db.createUser(
    {
      user: "subscriptions",
      pwd: "subscriptions",
      roles: [ "readWrite", "dbAdmin" ]
    }
 ),
  db.plans.drop(),
  db.plans.insert({
    code: 'gb',
    name: 'UK',
    monthlyCost: 10,
    annualCost: 50,
  }),
  db.plans.insert({
    code: 'fr',
    name: 'France',
    monthlyCost: 10,
    annualCost: 60,
  }),
  db.plans.insert({
    code: 'de',
    name: 'Germany',
    monthlyCost: 15,
    annualCost: 75,
  }),
  db.plans.insert({
    code: 'us',
    name: 'USA',
    monthlyCost: 25,
    annualCost: 150,
  }),
  db.plans.insert({
    code: 'jp',
    name: 'Japan',
    monthlyCost: 15,
    annualCost: 65,
  }),
]

printjson(res)

if (error) {
  print('Error, exiting')
  quit(1)
}
