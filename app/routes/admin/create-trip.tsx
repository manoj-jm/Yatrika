import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey } from "~/lib/utils";

export const loader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,name,latlng,maps"
  );
  const data = await response.json();

  const mapped = data.map((country: any) => ({
    name: country.name.common,
    flag: country.flags.png,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMap,
  }));

  mapped.sort((a: any, b: any) => a.name.localeCompare(b.name));
  return mapped;
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => {};
  const handleChange = (key: keyof TripFormData, value: String | number) => {};

  const countries = (loaderData ?? []) as Country[];
  // console.log(countries);

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
    flag: country.flag, // ✅ Add flag
  }));

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title={`Trips`}
        description="view and edite AI-generator travel plans "
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a Country"
              className="combo-box"
              itemTemplate={(data: any) => (
                <div className="flex items-center gap-2">
                  <img
                    src={data.flag}
                    alt={data.text}
                    className="w-5 h-4 ml-4 object-contain"
                  />
                  <span>{data.text}</span>
                </div>
              )}
              valueTemplate={(data: any) => (
                <div className="flex flex-row items-center">
                  <img
                    src={data?.flag}
                    alt={data?.text}
                    className="w-5 h-4 ml-4 object-contain"
                  />
                  <span>{data?.text}</span>
                </div>
              )}
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowCustom={true} // ✅ Prevents typing random text
              showClearButton={true}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();
                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                      flag: country.flag,
                    }))
                );
              }}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              placeholder="Enter the number of days "
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)} `}
                onChange={(e: { value: String | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
                className="combo-box"
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
