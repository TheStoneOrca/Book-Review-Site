import { Title, Text } from "@mantine/core";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center blasc">
      <Title>GoodReviews</Title>
      <div className="justify-center items-center">
        <Text>
          Share <span>all</span> of your thoughts about your reading.
        </Text>
      </div>
    </div>
  );
}
