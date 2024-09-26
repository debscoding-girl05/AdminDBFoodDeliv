import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Sector,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import chartData from "@/data/chartData.json";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { DialogLessonLike } from "../Dialogs/LessonLikesTable";
// Import the data from the JSON file

const chartConfig5 = {
  lesson: {
    label: "Lesson",
  },
  likes: {
    label: "likes",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "June",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function PiechartCoursLikes() {
  const id = "pie-interactive";
  const courslike = chartData.coursLesPlusLikes; // Access the specific array

  const [activeMonth, setActiveMonth] = React.useState(courslike[0].month);

  // Find the active index for the selected month
  const activeIndex = React.useMemo(
    () => courslike.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );

  // Extract the months from the data
  const months = React.useMemo(() => courslike.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig5} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Cours Les Plus Likes</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.length > 0 ? (
              months.map((key) => {
                const config = chartConfig5[key as keyof typeof chartConfig5];

                if (!config) {
                  console.warn(`No config found for key: ${key}`); // Log a warning if config is missing
                  return null;
                }

                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="" disabled>
                No months available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig5}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={courslike}
              dataKey="likes"
              nameKey="lesson"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {courslike[activeIndex].likes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Likes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex-center">
          <DialogLessonLike />
        </div>
      </CardFooter>
    </Card>
  );
}
