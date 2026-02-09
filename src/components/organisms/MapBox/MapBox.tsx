"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useProjectStore } from "@/store/projectStore";
import styles from "./MapBox.module.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const projects = useProjectStore((s) => s.projects);
  const selectedProjectId = useProjectStore((s) => s.selectedProjectId);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.08175, 4.60971], 
      zoom: 4,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Renderizar marcadores
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    projects.forEach((project) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([project.location.lng, project.location.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [projects]);

  //Moverse al proyecto seleccionado
  useEffect(() => {
    if (!mapRef.current || !selectedProjectId) return;

    const project = projects.find((p) => p.id === selectedProjectId);
    if (!project) return;

    mapRef.current.flyTo({
      center: [project.location.lng, project.location.lat],
      zoom: 13,
      essential: true,
    });
  }, [selectedProjectId, projects]);

  return <div ref={mapContainerRef} className={styles.map} />;
}
