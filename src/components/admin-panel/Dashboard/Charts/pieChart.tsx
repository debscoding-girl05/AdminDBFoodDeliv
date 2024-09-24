
import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Sector,
  CartesianGrid,
  BarChart,
  XAxis,
  Bar,
  Area,
  AreaChart,
  Line,
  LineChart,
  LabelList,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
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
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import{
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLessonStore } from "@/hooks/lessonStore";
import { DialogLessonLike } from "../Dialogs/LessonLikesTable";
import { DialogLessonSuivis } from "../Dialogs/LessonSuivis";




//Piechart

const chartData1 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const ChartConfig1 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData1.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
 

  return (
    <Card className="flex flex-col bg-slate-100 outline outline-gray-100 overflow-hidden">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cours les plus Aimés</CardTitle>
        <CardDescription>Janvier - Juin 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={ChartConfig1}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData1}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
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
                          {totalVisitors.toLocaleString()}
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
           <DialogLessonLike/>
        </div>
      </CardFooter>
    </Card>
  );
}








const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig1 = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
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
} satisfies ChartConfig;

export function PieComponent2() {
  const id = "pie-interactive";

  const lessons=useLessonStore((state)=>state.lessons);

    const [activeLesson, setActiveLesson] = React.useState(
      lessons[0]?.title || ""
    );

   const activeIndex = React.useMemo(
     () => lessons.findIndex((lesson) => lesson.title === activeLesson),
     [activeLesson, lessons]
   );
  const lessonTitles = React.useMemo(
    () => lessons.map((lesson) => lesson.title),
    [lessons]
  );

  return (
    <Card
      data-chart={id}
      className="flex flex-col bg-slate-100 outline outline-gray-100"
    >
      {/* Chart Style */}
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Cours Les plus Suivis</CardTitle>
          <CardDescription>Lessons Overview</CardDescription>
        </div>

        {/* Dropdown for selecting the lesson */}
        <Select value={activeLesson} onValueChange={setActiveLesson}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a lesson"
          >
            <SelectValue placeholder="Select Lesson" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {lessonTitles.map((title) => (
              <SelectItem
                key={title}
                value={title}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-3 w-3 shrink-0 rounded-sm bg-blue-500" />
                  {title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <PieChart width={300} height={300}>
          <Pie
            data={desktopData}
            dataKey="desktop" // You can change this to other fields, e.g., lesson popularity or completion rate
            nameKey="title"
            innerRadius={60}
            outerRadius={80}
            activeIndex={activeIndex}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
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
                        {lessons[activeIndex]?.duration || 2}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Duration
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </CardContent>
      <CardFooter className="flex items-center flex-col">
        <div className="flex items-center">
          <DialogLessonSuivis/>
        </div>
      </CardFooter>
    </Card>
  );
}



const chartData2 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Tutoriels les plus/Moins Aimés</CardTitle>
        <CardDescription>Janvier - Septembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart accessibilityLayer data={chartData2}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Augmentation 5.2% ce mois <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tutoriels les plus/Moins Aimés
        </div>
      </CardFooter>
    </Card>
  );
}


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
  { month: "September", desktop: 214, mobile: 140 },
  { month: "October", desktop: 209, mobile: 130 },
  { month: "November", desktop: 209, mobile: 130 },
  { month: "December", desktop: 209, mobile: 130 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Taux D'inscriptions</CardTitle>
        <CardDescription>
          Compare nombres Visiteurs et nombres d'inscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
               5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Janvier - Decembre 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export const description = "A line chart with a label";

const chartData3 = [
  { month: "January", users: 186, mobile: 100 },
  { month: "February", users: 305, mobile: 200 },
  { month: "March", users: 237, mobile: 120 },
  { month: "April", users: 73, mobile: 190 },
  { month: "May", users: 209, mobile: 130 },
  { month: "June", users: 214, mobile: 0 },
];

const chartConfig3 = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nombre d'Utilisateurs</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig3}>
          <LineChart
            accessibilityLayer
            data={chartData3}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="users"
              type="natural"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-users)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
       5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
         Montre le nombre de Visiteurs ces derniers six Mois
        </div>
      </CardFooter>
    </Card>
  );
}

const chartData4 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig4 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HoriBarchartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutoriels les plus Commentés</CardTitle>
        <CardDescription>Janvier - Septembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig4}>
          <BarChart
            accessibilityLayer
            data={chartData4}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Tutoriels les plus commentés
        </div>
      </CardFooter>
    </Card>
  );
}
