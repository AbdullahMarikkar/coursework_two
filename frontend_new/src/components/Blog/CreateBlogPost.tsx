import { Typography, Box, TextField, Button, Avatar } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useFetchCountryByName } from "../../Services/ReactQueryFiles/useFetchCountryByName";
import LoadingIndicator from "../../Utils/LoadingIndicator";
import { useAddBlogPost } from "../../Services/ReactQueryFiles/useAddBlogPost";
import { useCreateCountryRecord } from "../../Services/ReactQueryFiles/useCreateCountryRecordForBlog";
import { useNavigate } from "react-router-dom";

export function flagEmojiToCountryCode(flag: any) {
  // Split the emoji into two surrogate pairs
  const codePoints = [...flag].map((c) => c.codePointAt(0));
  return codePoints
    .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65)) // Convert to uppercase letters
    .join("")
    .toLowerCase(); // Convert the final result to lowercase
}

export function getFlagUrl(name: string) {
  const nameToLower = flagEmojiToCountryCode(name);
  return `https://flagcdn.com/48x36/${nameToLower}.png`;
}

function CreateBlogPost() {
  const navigate = useNavigate();
  const countryName = useRef<any>(null);
  const title = useRef<any>(null);
  const blogContent = useRef<any>(null);
  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const { data, isLoading } = useFetchCountryByName({
    name: country,
  });
  const { addBlogPostFn, isPending } = useAddBlogPost();
  const { createCountryRecordFn, isPending: isCreateCountryRecordPending } =
    useCreateCountryRecord();

  if (isLoading) <LoadingIndicator />;

  function handleSearchCountries() {
    if (countryName.current.value == "" || countryName.current.value == null) {
      return toast.warn("Type a Valid Country Name before Search");
    }
    setCountry(countryName.current.value);
  }

  function handleSubmitBlogPost() {
    if (
      !selectedCountry ||
      blogContent.current.value == null ||
      blogContent.current.value == "" ||
      title.current.value == null ||
      title.current.value == ""
    ) {
      return toast.warning(
        "Select Country, Enter Title and Enter Some Blog Content Before Submitting"
      );
    }
    addBlogPostFn(
      {
        country: selectedCountry?.name.common,
        title: title.current.value,
        content: blogContent.current.value,
      },
      {
        onSuccess(data) {
          createCountryRecordFn({
            name: selectedCountry?.name.common,
            capital: selectedCountry?.capital[0],
            currency: Object.keys(selectedCountry?.currencies).join(","),
            language: Object.values(selectedCountry?.languages).join(","),
            flag: getFlagUrl(selectedCountry?.flag),
            blog_id: data.data.id,
          });
          title.current.value = null;
          blogContent.current.value = null;
          setSelectedCountry(null);
          navigate("/");
        },
      }
    );
  }

  function setCountryDetailForPost(countryData: any) {
    countryName.current.value = "";
    setCountry("");
    setSelectedCountry(countryData);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          backgroundColor: "whitesmoke",
          padding: "10px",
          borderRadius: "10px",
          gap: "10px",
        }}
      >
        <Typography>Which Country You've Visited</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <TextField label="Search Country" inputRef={countryName}></TextField>
          {!isLoading &&
            data &&
            data.data &&
            data.data.length > 0 &&
            data?.data?.map((countryData: any) => {
              return (
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "wheat",
                    margin: "5px",
                    padding: "5px",
                  }}
                  onClick={() => setCountryDetailForPost(countryData)}
                >
                  <Typography>{countryData.name.common}</Typography>
                  <Avatar
                    src={getFlagUrl(countryData.flag)}
                    alt={`${countryData.flag}`}
                  />
                </Button>
              );
            })}
        </Box>
        <Button onClick={() => handleSearchCountries()} variant="outlined">
          Search Country
        </Button>
      </Box>
      {selectedCountry && (
        <Box sx={{ border: 1, borderRadius: "10px", padding: "10px" }}>
          <Typography fontSize={"18px"}>Country Details</Typography>
          <Typography fontSize={"18px"}>
            Country Name : {selectedCountry?.name.common}
          </Typography>
          <Typography fontSize={"18px"}>
            Capital : {selectedCountry?.capital[0]}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              alignItems: "center",
            }}
            fontSize={"18px"}
          >
            Language :{" "}
            {Object.values(selectedCountry?.languages).map((lang: any) => (
              <Typography fontSize={"18px"}>{lang}</Typography>
            ))}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              alignItems: "center",
            }}
            fontSize={"18px"}
          >
            Currency :{" "}
            {Object.values(selectedCountry?.currencies).map((currency: any) => (
              <Typography fontSize={"18px"}>{currency.name}</Typography>
            ))}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              alignItems: "center",
            }}
            fontSize={"18px"}
          >
            Flag : {<img src={getFlagUrl(selectedCountry?.flag)} />}
          </Typography>
        </Box>
      )}
      <Box sx={{ marginTop: "10px", padding: "10px" }}>
        <TextField
          sx={{ width: "100%" }}
          label="Enter Title For Your Blog"
          inputRef={title}
        ></TextField>
      </Box>
      <Box sx={{ marginTop: "10px", padding: "10px" }}>
        <TextField
          sx={{ width: "100%", height: "50%" }}
          label="Enter Blog Content"
          inputRef={blogContent}
          multiline
          rows={10}
        ></TextField>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}>
        <Button
          variant="contained"
          onClick={() => handleSubmitBlogPost()}
          disabled={isPending || isLoading || isCreateCountryRecordPending}
        >
          Submit Blog Post
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBlogPost;
