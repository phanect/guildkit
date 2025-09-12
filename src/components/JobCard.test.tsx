import { ok } from "node:assert";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { JobCard } from "./JobCard.tsx";

const job = {
  id: "dummy",
  title: "tetete",
  description: "description",
  employer: {
    name: "Employer, Inc.",
  },
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025:02-02"),
};

test("loads and displays greeting", async () => {
  render(
    <JobCard job={job} editable />
  );

  expect(screen.getByRole("link", { name: "Edit" }))
    .toHaveAttribute("href", `/employer/jobs/edit/${ job.id }`);
  ok(screen.getByRole("button", { name: "Delete" }));
});
