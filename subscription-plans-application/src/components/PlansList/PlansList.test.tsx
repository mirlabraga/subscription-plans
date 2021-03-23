import React from "react";
import { HTMLAttributes, mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import PlansList from "./PlansList";
import * as plansLib from "../../lib/plans";
import { act } from "react-dom/test-utils";

const PLANS = [{
  code: 'gb',
  name: 'UK',
  monthlyCost: 10,
  annualCost: 50,
}, {
  code: 'fr',
  name: 'France',
  monthlyCost: 10,
  annualCost: 60,
}, {
  code: 'de',
  name: 'Germany',
  monthlyCost: 15,
  annualCost: 75,
}, {
  code: 'us',
  name: 'USA',
  monthlyCost: 25,
  annualCost: 150,
}, {
  code: 'jp',
  name: 'Japan',
  monthlyCost: 15,
  annualCost: 65,
}]
// jest.mock('react');

jest.mock("../../lib/plans", () => {
  return {
    fetchPlans: () => Promise.resolve(PLANS)
  }
});

describe("PlansList", () => {

  it("should match snapshot", () => {
    const container = shallow(<PlansList initialPlans={PLANS}/>);
    expect(container).toMatchSnapshot();
  })

  it("should start with no plan selected and to be annual", () => {
    const container = shallow(<PlansList initialPlans={PLANS}/>);
    expect(container.find('#periodType').text()).toEqual("/year");
    expect(container.find('#totalPrice').text()).toEqual("0");
  });

  it("should change to monthly plan when click in the toggle", () => {
    const container = shallow(<PlansList initialPlans={PLANS}/>);
    container.find('input[id="annuallyCheckbox"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/month");
    expect(container.find('#totalPrice').text()).toEqual("0");
  });

  it("should sum the selected plans", () => {

    let container: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>> = null as any;

    //avoid useEffect
    jest.spyOn(React, 'useEffect').mockImplementation(() => {})

    container = mount(<PlansList initialPlans={PLANS}/>);
    expect(container.find('input[id="plan-check-box-gb"]').length).toBe(1);

    container.find('input[id="plan-check-box-gb"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/year");
    expect(container.find('#totalPrice').text()).toEqual("50");

    container.find('input[id="annuallyCheckbox"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/month");
    expect(container.find('#totalPrice').text()).toEqual("10");

    container.find('input[id="plan-check-box-fr"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/month");
    expect(container.find('#totalPrice').text()).toEqual("20");

    container.find('input[id="annuallyCheckbox"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/year");
    expect(container.find('#totalPrice').text()).toEqual("110");

    container.find('input[id="plan-check-box-gb"]').simulate('change');
    expect(container.find('#periodType').text()).toEqual("/year");
    expect(container.find('#totalPrice').text()).toEqual("60");

  });

});
