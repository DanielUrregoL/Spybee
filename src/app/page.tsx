"use client";

import { useEffect, useState } from "react";
import MainTemplate from "@/components/templates/MainTemplate/MainTemplate";
import Header from "@/components/organisms/Header/Header";
import ProjectTable from "@/components/organisms/ProjectTable/ProjectTable";
import Pagination from "@/components/molecules/Pagination/Pagination";
import MapBox from "@/components/organisms/MapBox/MapBox";
import { useProjectStore } from "@/store/projectStore";
import { getProjects } from "@/services/getProjects";
import styles from "@/app/page.module.css"
import Summary from "@/components/organisms/Summnary/Summary";
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [showMap, setShowMap] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const setProjects = useProjectStore((s) => s.setProjects);
  const search = useProjectStore((s) => s.search);
  const setSearch = useProjectStore((s) => s.setSearch);
  const paginatedProjects = useProjectStore((s) => s.paginatedProjects);
  const selectedId = useProjectStore((s) => s.selectedProjectId);
  const selectProject = useProjectStore((s) => s.selectProject);
  const currentPage = useProjectStore((s) => s.currentPage);
  const totalPages = useProjectStore((s) => s.totalPages);
  const setPage = useProjectStore((s) => s.setPage);

  useEffect(() => {
    setProjects(getProjects());
  }, [setProjects]);

  return (
    <main>
      <MainTemplate
        header={
          <Header
            searchValue={search}
            onSearchChange={setSearch}
            showMap={showMap}
            onToggleMap={() => setShowMap((v) => !v)}
          />
        }
      />

      <button
        className={`${styles.summaryToggle} ${showSummary ? styles.summaryActive : ""}`}
        onClick={() => setShowSummary((v) => !v)}
      >
        {showSummary ? "" : <Presentation size={25} />}
      </button>

      <button
        className={`${styles.summaryToggleCircle} ${showSummary ? styles.summaryActive : ""}`}
        onClick={() => setShowSummary((v) => !v)}
      >
        {showSummary ? <ChevronRight size={25} /> : <ChevronLeft size={25} />}
      </button>

      <div className={showSummary ? styles.contentWrapper + ' ' + styles.summaryActive : styles.contentWrapper}>
        <div
          className={`${styles.mapWrapper} ${showMap ? styles.show : styles.hide} ${showSummary ? styles.summaryActive : ""}`}
        >
          <MapBox />
        </div>

        <ProjectTable
          projects={paginatedProjects}
          selectedId={selectedId}
          onSelect={selectProject}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* SUMMARY */}
      <aside
        className={`${styles.summary} ${showSummary ? styles.summaryVisible : ""}`}
      >
        <Summary
          projects={paginatedProjects}
          selectedId={selectedId}
          onSelect={selectProject}
        />
      </aside>
    </main>
  );
}