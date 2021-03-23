import React, { useEffect, useState } from "react";
import { fetchPlans, Plan } from "../../lib/plans";

const GENERIC_ERRO = "An error happened when the research request was being the search";

interface PlansListProps {
  initialPlans?: Plan[];
}
function PlansList({initialPlans}: PlansListProps) {

  const [isMonthly, setIsMonthly] = useState(false);
  const [totalPlansPrice, setTotalPlansPrice] = useState(0);
  const [plans, setPlans] = useState<Plan[]>(initialPlans || []);
  const [selectedPlans, setSeletedPlans] = useState<{[key: string]: Plan}>({});
  const [message, setMessage] = useState('');

  //Unfortunettly it should be like this to be easy to mock
  React.useEffect(() => {
    fetchPlans().then(plans => {
      console.log("fetched plans: ", plans);
      setPlans(plans);
    })
    .catch(e => {
      console.error(e);
      setMessage(GENERIC_ERRO);
      setPlans([]);
    })
  }, []);


  useEffect(() => {
    let newTotal = 0;
    for(const planCode in selectedPlans) {
      const plan = selectedPlans[planCode];
      newTotal += isMonthly ? plan.monthlyCost : plan.annualCost
    }
    setTotalPlansPrice(newTotal);
  }, [selectedPlans, isMonthly])

  const handlePlanCheck = (plan: Plan) => {
    const newSelectedPlans = {
      ...selectedPlans
    }
    if (!!selectedPlans[plan.code]) {
      delete newSelectedPlans[plan.code];
    } else {
      newSelectedPlans[plan.code] = plan;
    }
    setSeletedPlans(newSelectedPlans);
  }

  return (
    <div>
      {message ?
        (<div className="error" >{message}</div>)
      : <></>}
      <div>
        Annually: <input id="annuallyCheckbox" type="checkbox" onChange={() => setIsMonthly(!isMonthly)} checked={!isMonthly} />
      </div>
      <table>
        <thead>
          <tr>
            <td>Code</td>
            <td>Name</td>
            <td>Monthly price</td>
            <td>Annual price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any) => {
            return (
            <tr key={plan.code}>
              <td>{plan.code}</td>
              <td>{plan.name}</td>
              <td>{plan.monthlyCost}</td>
              <td>{plan.annualCost}</td>
              <td><input
                id={`plan-check-box-${plan.code}`}
                type="checkbox"
                checked={!!selectedPlans[plan.code]}
                onChange={() => handlePlanCheck(plan)}/></td>
            </tr>)
          })}
        </tbody>
      </table>
      <div>Total: £ <span id="totalPrice">{totalPlansPrice}</span> <span id="periodType">{isMonthly ? '/month' : '/year'}</span></div>
    </div>
  );
}

export default PlansList;
