import React from "react";
import { mount } from "enzyme";

import Selector from "./Selector";

const mockResult = {
  description: {
    de: "Nationalbankgewinne für die AHV",
    en: "National Bank profits for the OASI",
    fr: "Bénéfices de la Banque nationale pour l'AVS",
    it: "Utili della Banca nazionale per l'AVS"
  },
  results: [
    {
      canton: "AG",
      yes: 62092,
      no: 105546
    },
    {
      canton: "AR",
      yes: 6337,
      no: 12406
    },
    {
      canton: "AI",
      yes: 1181,
      no: 3522
    },
    {
      canton: "BL",
      yes: 41764,
      no: 50047
    },
    {
      canton: "BS",
      yes: 33519,
      no: 29068
    },
    {
      canton: "BE",
      yes: 129215,
      no: 174516
    },
    {
      canton: "FR",
      yes: 32772,
      no: 49721
    },
    {
      canton: "GE",
      yes: 61568,
      no: 58362
    },
    {
      canton: "GL",
      yes: 3476,
      no: 6901
    },
    {
      canton: "GR",
      yes: 21412,
      no: 35199
    },
    {
      canton: "JU",
      yes: 10708,
      no: 10806
    },
    {
      canton: "LU",
      yes: 43071,
      no: 73939
    },
    {
      canton: "NE",
      yes: 22745,
      no: 31715
    },
    {
      canton: "NW",
      yes: 3697,
      no: 10221
    },
    {
      canton: "OW",
      yes: 2705,
      no: 8081
    },
    {
      canton: "SH",
      yes: 12803,
      no: 17340
    },
    {
      canton: "SZ",
      yes: 15846,
      no: 30591
    },
    {
      canton: "SO",
      yes: 33754,
      no: 43804
    },
    {
      canton: "SG",
      yes: 55456,
      no: 85461
    },
    {
      canton: "TI",
      yes: 50861,
      no: 37548
    },
    {
      canton: "TG",
      yes: 22426,
      no: 43936
    },
    {
      canton: "UR",
      yes: 3376,
      no: 6518
    },
    {
      canton: "VD",
      yes: 89596,
      no: 104943
    },
    {
      canton: "VS",
      yes: 33397,
      no: 58007
    },
    {
      canton: "ZG",
      yes: 12410,
      no: 24983
    },
    {
      canton: "ZH",
      yes: 167810,
      no: 246325
    }
  ]
};

describe("The autocomplete selector", () => {
  const hasMenu = wrapper => wrapper.find("li").length > 0;

  test("menu is closed by default", () => {
    const wrapper = mount(<Selector results={[mockResult]} />);
    expect(hasMenu(wrapper)).toBe(false);
  });

  test("lists results with a keydown of ArrowDown on the input", () => {
    const wrapper = mount(<Selector results={[mockResult]} />);
    const input = wrapper.find("input");
    input.simulate("keydown", { key: "ArrowDown" });
    expect(hasMenu(wrapper)).toBe(true);
  });

  test('can search for and select "National Bank profits for the OASI"', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Selector results={[mockResult]} onChange={onChange} />
    );
    const input = wrapper.find("input");

    input.simulate("change", {
      target: { value: "National Bank profits for the OASI" }
    });
    input.simulate("keydown", { key: "ArrowDown" });
    input.simulate("keydown", { key: "Enter" });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(mockResult);
    expect(input.instance().value).toBe("National Bank profits for the OASI");
  });
});
