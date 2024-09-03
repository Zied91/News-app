import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

async function FilteredHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid Filter");
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsContent = <p>No news found for the selected period</p>;
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  return newsContent;
}

const FilteredNewsPage = async ({ params }) => {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (selectedYear && !selectedMonth) {
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    links = [];
  }

  return (
    <>
      {/* <Suspense fallback={<p>Loading News...</p>}> */}

      <FilteredHeader year={selectedYear} month={selectedMonth} />
      {/* </Suspense> */}

      {/* <Suspense fallback={<p>Loading News...</p>}> */}
      <FilteredNews year={selectedYear} month={selectedMonth} />
      {/* </Suspense> */}
    </>
  );
};

export default FilteredNewsPage;
