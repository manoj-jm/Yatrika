import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatDate, formatKey } from "~/lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";

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
  const countries = (loaderData ?? []) as Country[];
  // console.log(countries);

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[101]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  // console.log(formData.country)

  const [Error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.duration ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Please provide value for all fields");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      console.log("User is not authenticate");
      setLoading(false);
      return;
    }

    try {
      console.log("user : ", user);
      console.log("formData : ", formData);
    } catch (error) {
      console.log("Error Generating Trip : ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (key: keyof TripFormData, value: String | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
    flag: country.flag, // ✅ Add flag
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#211dff",
      coordinates:
        // @ts-ignore
        countries.find((c: Country) => c.name === formatDate.country)
          ?.coordinates || [],
    },
  ];

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
              type="number"
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

          {/*  map element :  */}
          <div>
            <label htmlFor="location">Location on the World Map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full" />

          {Error && (
            <div className="error">
              <p>{Error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                className={cn("size-5", { "animate-spin": loading })}
                alt="img"
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
