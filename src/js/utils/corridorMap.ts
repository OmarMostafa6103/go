/* eslint-disable @typescript-eslint/no-explicit-any */
declare const am5: any;
declare const am5map: any;
declare const am5geodata_germanyLow: any;
declare const am5geodata_region_world_europeLow: any;
declare const am5themes_Animated: any;
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * @file corridorMap.ts
 * @description Tech-style animated network visualization
 * @version 3.0.0
 *
 * Features:
 * - Elegant spreading network from Aachen
 * - Intra-city micro-networks (local delivery)
 * - Inter-city major corridors (long-haul)
 * - Glowing animated connections
 * - Packages traveling along active networks only
 */

interface CityHub {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  phase: number;
  isMainHub: boolean; // Major hub = larger micro-network
}

interface Corridor {
  from: string;
  to: string;
  phase: number;
  type: "micro" | "regional" | "major"; // Network hierarchy
}

/**
 * City hubs with expansion phases and hub importance
 */
const cityHubs: CityHub[] = [
  // Phase 0: Origin
  {
    id: "aachen",
    name: "Aachen",
    latitude: 50.7753,
    longitude: 6.0839,
    phase: 0,
    isMainHub: true,
  },

  // Phase 1: NRW
  {
    id: "cologne",
    name: "Köln",
    latitude: 50.9375,
    longitude: 6.9603,
    phase: 1,
    isMainHub: true,
  },
  {
    id: "dusseldorf",
    name: "Düsseldorf",
    latitude: 51.2277,
    longitude: 6.7735,
    phase: 1,
    isMainHub: true,
  },
  {
    id: "dortmund",
    name: "Dortmund",
    latitude: 51.5136,
    longitude: 7.4653,
    phase: 1,
    isMainHub: true,
  },
  {
    id: "essen",
    name: "Essen",
    latitude: 51.4556,
    longitude: 7.0116,
    phase: 1,
    isMainHub: false,
  },
  {
    id: "duisburg",
    name: "Duisburg",
    latitude: 51.4344,
    longitude: 6.7623,
    phase: 1,
    isMainHub: false,
  },
  {
    id: "bonn",
    name: "Bonn",
    latitude: 50.7374,
    longitude: 7.0982,
    phase: 1,
    isMainHub: false,
  },
  {
    id: "muenster",
    name: "Münster",
    latitude: 51.9607,
    longitude: 7.6261,
    phase: 1,
    isMainHub: false,
  },
  {
    id: "wuppertal",
    name: "Wuppertal",
    latitude: 51.2562,
    longitude: 7.1508,
    phase: 1,
    isMainHub: false,
  },
  {
    id: "bielefeld",
    name: "Bielefeld",
    latitude: 52.0302,
    longitude: 8.5325,
    phase: 1,
    isMainHub: false,
  },

  // Phase 2: Germany
  {
    id: "frankfurt",
    name: "Frankfurt",
    latitude: 50.1109,
    longitude: 8.6821,
    phase: 2,
    isMainHub: true,
  },
  {
    id: "hamburg",
    name: "Hamburg",
    latitude: 53.5511,
    longitude: 9.9937,
    phase: 2,
    isMainHub: true,
  },
  {
    id: "berlin",
    name: "Berlin",
    latitude: 52.52,
    longitude: 13.405,
    phase: 2,
    isMainHub: true,
  },
  {
    id: "munich",
    name: "München",
    latitude: 48.1351,
    longitude: 11.582,
    phase: 2,
    isMainHub: true,
  },
  {
    id: "stuttgart",
    name: "Stuttgart",
    latitude: 48.7758,
    longitude: 9.1829,
    phase: 2,
    isMainHub: true,
  },
  {
    id: "hannover",
    name: "Hannover",
    latitude: 52.3759,
    longitude: 9.732,
    phase: 2,
    isMainHub: false,
  },
  {
    id: "nuremberg",
    name: "Nürnberg",
    latitude: 49.4521,
    longitude: 11.0767,
    phase: 2,
    isMainHub: false,
  },
  {
    id: "leipzig",
    name: "Leipzig",
    latitude: 51.3397,
    longitude: 12.3731,
    phase: 2,
    isMainHub: false,
  },
  {
    id: "bremen",
    name: "Bremen",
    latitude: 53.0793,
    longitude: 8.8017,
    phase: 2,
    isMainHub: false,
  },
  {
    id: "dresden",
    name: "Dresden",
    latitude: 51.0504,
    longitude: 13.7373,
    phase: 2,
    isMainHub: false,
  },

  // Phase 3: Benelux
  {
    id: "amsterdam",
    name: "Amsterdam",
    latitude: 52.3676,
    longitude: 4.9041,
    phase: 3,
    isMainHub: true,
  },
  {
    id: "rotterdam",
    name: "Rotterdam",
    latitude: 51.9244,
    longitude: 4.4777,
    phase: 3,
    isMainHub: true,
  },
  {
    id: "brussels",
    name: "Brüssel",
    latitude: 50.8503,
    longitude: 4.3517,
    phase: 3,
    isMainHub: true,
  },
  {
    id: "antwerp",
    name: "Antwerpen",
    latitude: 51.2194,
    longitude: 4.4025,
    phase: 3,
    isMainHub: false,
  },
  {
    id: "luxembourg",
    name: "Luxemburg",
    latitude: 49.6117,
    longitude: 6.1319,
    phase: 3,
    isMainHub: false,
  },
  {
    id: "liege",
    name: "Lüttich",
    latitude: 50.6326,
    longitude: 5.5797,
    phase: 3,
    isMainHub: false,
  },
  {
    id: "eindhoven",
    name: "Eindhoven",
    latitude: 51.4416,
    longitude: 5.4697,
    phase: 3,
    isMainHub: false,
  },
];

/**
 * Network corridors - hierarchical
 */
const corridors: Corridor[] = [
  // Phase 1: NRW internal network
  { from: "aachen", to: "cologne", phase: 1, type: "major" },
  { from: "aachen", to: "bonn", phase: 1, type: "regional" },
  { from: "cologne", to: "bonn", phase: 1, type: "regional" },
  { from: "cologne", to: "dusseldorf", phase: 1, type: "major" },
  { from: "dusseldorf", to: "duisburg", phase: 1, type: "regional" },
  { from: "dusseldorf", to: "essen", phase: 1, type: "regional" },
  { from: "dusseldorf", to: "wuppertal", phase: 1, type: "regional" },
  { from: "duisburg", to: "essen", phase: 1, type: "micro" },
  { from: "essen", to: "dortmund", phase: 1, type: "regional" },
  { from: "dortmund", to: "muenster", phase: 1, type: "regional" },
  { from: "muenster", to: "bielefeld", phase: 1, type: "regional" },
  { from: "cologne", to: "wuppertal", phase: 1, type: "micro" },
  { from: "wuppertal", to: "dortmund", phase: 1, type: "micro" },

  // Phase 2: Germany expansion
  { from: "cologne", to: "frankfurt", phase: 2, type: "major" },
  { from: "bonn", to: "frankfurt", phase: 2, type: "regional" },
  { from: "dortmund", to: "hannover", phase: 2, type: "major" },
  { from: "bielefeld", to: "hannover", phase: 2, type: "regional" },
  { from: "muenster", to: "bremen", phase: 2, type: "regional" },
  { from: "hannover", to: "hamburg", phase: 2, type: "major" },
  { from: "hannover", to: "berlin", phase: 2, type: "major" },
  { from: "hamburg", to: "berlin", phase: 2, type: "major" },
  { from: "berlin", to: "leipzig", phase: 2, type: "regional" },
  { from: "berlin", to: "dresden", phase: 2, type: "regional" },
  { from: "leipzig", to: "dresden", phase: 2, type: "micro" },
  { from: "frankfurt", to: "nuremberg", phase: 2, type: "regional" },
  { from: "frankfurt", to: "stuttgart", phase: 2, type: "major" },
  { from: "nuremberg", to: "munich", phase: 2, type: "major" },
  { from: "stuttgart", to: "munich", phase: 2, type: "major" },
  { from: "leipzig", to: "nuremberg", phase: 2, type: "regional" },
  { from: "hannover", to: "bremen", phase: 2, type: "regional" },

  // Phase 3: Benelux connections
  { from: "aachen", to: "liege", phase: 3, type: "major" },
  { from: "liege", to: "brussels", phase: 3, type: "major" },
  { from: "brussels", to: "antwerp", phase: 3, type: "regional" },
  { from: "antwerp", to: "rotterdam", phase: 3, type: "major" },
  { from: "rotterdam", to: "amsterdam", phase: 3, type: "major" },
  { from: "dusseldorf", to: "eindhoven", phase: 3, type: "regional" },
  { from: "eindhoven", to: "amsterdam", phase: 3, type: "regional" },
  { from: "cologne", to: "luxembourg", phase: 3, type: "regional" },
  { from: "luxembourg", to: "brussels", phase: 3, type: "regional" },
  { from: "antwerp", to: "eindhoven", phase: 3, type: "micro" },
  { from: "aachen", to: "eindhoven", phase: 3, type: "regional" },
];

// References for cleanup
let mapRoot: any = null;
let animationIntervals: ReturnType<typeof setInterval>[] = [];

/**
 * Initialize the tech-style corridor map
 */
export const initCorridorMap = (): void => {
  // Support both corridor.html and investor.html
  const container =
    document.getElementById("corridor-map") ||
    document.getElementById("investor-deployment-map");

  console.log("initCorridorMap called");
  console.log("Container found:", container?.id || "none");
  console.log("am5 available:", typeof am5 !== "undefined");
  console.log("mapRoot state:", mapRoot);

  if (!container) {
    console.warn("No corridor or investor deployment map container found");
    return;
  }

  if (
    typeof am5 === "undefined" ||
    typeof am5geodata_germanyLow === "undefined"
  ) {
    console.error("amCharts libraries not loaded");
    return;
  }

  // Check if Europe geodata is available
  const hasEuropeData =
    typeof am5geodata_region_world_europeLow !== "undefined";
  if (!hasEuropeData) {
    console.warn("Europe geodata not loaded - using Germany only");
  }

  // Allow reinitialization for different containers (e.g., corridor.html vs investor.html)
  if (mapRoot) {
    const existingContainer = mapRoot.container;
    if (existingContainer && existingContainer.id === container.id) {
      console.log("mapRoot already initialized for this container");
      return;
    }
    // Clean up old mapRoot if switching containers
    console.log("Cleaning up previous mapRoot for container switch");
    try {
      mapRoot.dispose();
    } catch (e) {
      console.warn("Error disposing old mapRoot:", e);
    }
    mapRoot = null;
  }

  const containerId = container.id;
  console.log("Initializing amCharts for container:", containerId);
  console.log(
    "Container DOM element:",
    container,
    "dimensions:",
    container.offsetWidth,
    "x",
    container.offsetHeight,
  );

  // Clear any existing content in the container (important when switching pages)
  container.innerHTML = "";

  try {
    mapRoot = am5.Root.new(container);
    console.log("mapRoot created successfully");
  } catch (error) {
    console.error("Failed to create mapRoot:", error);
    return;
  }

  mapRoot.setThemes([am5themes_Animated.new(mapRoot)]);

  // Set light background for the root container
  mapRoot.container.set(
    "background",
    am5.Rectangle.new(mapRoot, {
      fill: am5.color(0xf8fafc),
      fillOpacity: 1,
    }),
  );

  // Tech-style map chart
  console.log("Creating MapChart...");
  let chart: any;
  try {
    chart = mapRoot.container.children.push(
      am5map.MapChart.new(mapRoot, {
        projection: am5map.geoMercator(),
        panX: "translateX",
        panY: "translateY",
        wheelY: "zoom",
        homeGeoPoint: { latitude: 51.0, longitude: 10.0 },
        homeZoomLevel: 5.5, // Start zoomed in on Germany
        minZoomLevel: 2,
        maxZoomLevel: 10,
      }),
    );
    console.log("MapChart created successfully", chart);
  } catch (error) {
    console.error("Failed to create MapChart:", error);
    return;
  }

  // Add chart background
  console.log("Setting chart background...");
  chart.chartContainer.set(
    "background",
    am5.Rectangle.new(mapRoot, {
      fill: am5.color(0xf8fafc),
      fillOpacity: 1,
    }),
  );

  // Europe polygons - visible from start
  let europeSeries: any = null;
  if (hasEuropeData) {
    europeSeries = chart.series.push(
      am5map.MapPolygonSeries.new(mapRoot, {
        geoJSON: am5geodata_region_world_europeLow,
        exclude: ["DE"], // Exclude Germany since we have it separately
      }),
    );

    europeSeries.mapPolygons.template.setAll({
      fill: am5.color(0xe2e8f0),
      fillOpacity: 1,
      strokeWidth: 0.5,
      stroke: am5.color(0xcbd5e1),
      strokeOpacity: 0.8,
      interactive: true,
      tooltipText: "{name}",
    });

    europeSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xd1d5db),
    });
  }

  // Germany polygons - highlighted
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(mapRoot, {
      geoJSON: am5geodata_germanyLow,
    }),
  );

  polygonSeries.mapPolygons.template.setAll({
    fill: am5.color(0xf1f5f9),
    fillOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color(0x94a3b8),
    interactive: true,
    tooltipText: "{name}",
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(0xe2e8f0),
  });

  // === ZOOM CONTROLS ===
  chart.set(
    "zoomControl",
    am5map.ZoomControl.new(mapRoot, {
      x: am5.percent(98),
      centerX: am5.percent(100),
      y: am5.percent(50),
      centerY: am5.percent(50),
    }),
  );

  // Style zoom control buttons
  const zoomControl = chart.get("zoomControl");
  if (zoomControl) {
    zoomControl.plusButton.setAll({
      fill: am5.color(0xffffff),
      stroke: am5.color(0x22c55e),
      strokeWidth: 1,
    });
    zoomControl.minusButton.setAll({
      fill: am5.color(0xffffff),
      stroke: am5.color(0x22c55e),
      strokeWidth: 1,
    });
  }

  // === NETWORK LINE LAYERS ===

  // Background glow layer for major corridors
  const glowSeries = chart.series.push(am5map.MapLineSeries.new(mapRoot, {}));
  glowSeries.mapLines.template.setAll({
    stroke: am5.color(0x22c55e),
    strokeWidth: 10,
    strokeOpacity: 0.2,
  });

  // Main corridor lines
  const majorLineSeries = chart.series.push(
    am5map.MapLineSeries.new(mapRoot, {}),
  );
  majorLineSeries.mapLines.template.setAll({
    stroke: am5.color(0x16a34a),
    strokeWidth: 3,
    strokeOpacity: 1,
  });

  // Regional lines
  const regionalLineSeries = chart.series.push(
    am5map.MapLineSeries.new(mapRoot, {}),
  );
  regionalLineSeries.mapLines.template.setAll({
    stroke: am5.color(0x22c55e),
    strokeWidth: 2,
    strokeOpacity: 0.9,
  });

  // Micro/local lines
  const microLineSeries = chart.series.push(
    am5map.MapLineSeries.new(mapRoot, {}),
  );
  microLineSeries.mapLines.template.setAll({
    stroke: am5.color(0x4ade80),
    strokeWidth: 1.5,
    strokeOpacity: 0.7,
  });

  // Animated pulse lines (on top)
  const pulseSeries = chart.series.push(am5map.MapLineSeries.new(mapRoot, {}));
  pulseSeries.mapLines.template.setAll({
    stroke: am5.color(0x16a34a),
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeDasharray: [3, 8],
  });

  // === CITY POINTS ===
  const pointSeries = chart.series.push(am5map.MapPointSeries.new(mapRoot, {}));

  pointSeries.bullets.push(() => {
    const cont = am5.Container.new(mapRoot, {
      cursorOverStyle: "pointer",
    });

    // Outer glow ring
    const glow = cont.children.push(
      am5.Circle.new(mapRoot, {
        radius: 16,
        fill: am5.color(0x16a34a),
        fillOpacity: 0,
      }),
    );

    // Animated expanding ring
    glow.animate({
      key: "radius",
      from: 6,
      to: 20,
      duration: 2000,
      loops: Infinity,
      easing: am5.ease.out(am5.ease.cubic),
    });
    glow.animate({
      key: "fillOpacity",
      from: 0.4,
      to: 0,
      duration: 2000,
      loops: Infinity,
      easing: am5.ease.out(am5.ease.cubic),
    });

    // Inner ring (interactive hit area)
    const innerRing = cont.children.push(
      am5.Circle.new(mapRoot, {
        radius: 10,
        fill: am5.color(0xffffff),
        stroke: am5.color(0x16a34a),
        strokeWidth: 2,
        tooltipText: "{name}\n({latitude}°N, {longitude}°E)",
        interactive: true,
      }),
    );

    // Hover state
    innerRing.states.create("hover", {
      scale: 1.3,
      stroke: am5.color(0x15803d),
      strokeWidth: 3,
    });

    // Center dot
    cont.children.push(
      am5.Circle.new(mapRoot, {
        radius: 4,
        fill: am5.color(0x16a34a),
      }),
    );

    return am5.Bullet.new(mapRoot, { sprite: cont });
  });

  // === PACKAGE ANIMATION SERIES ===
  const packageSeries = chart.series.push(
    am5map.MapPointSeries.new(mapRoot, {}),
  );

  packageSeries.bullets.push(() => {
    const cont = am5.Container.new(mapRoot, {});

    // Glow trail
    cont.children.push(
      am5.Circle.new(mapRoot, {
        radius: 6,
        fill: am5.color(0x16a34a),
        fillOpacity: 0.4,
      }),
    );

    // Package dot
    cont.children.push(
      am5.Circle.new(mapRoot, {
        radius: 3,
        fill: am5.color(0x15803d),
        stroke: am5.color(0xffffff),
        strokeWidth: 1,
      }),
    );

    return am5.Bullet.new(mapRoot, { sprite: cont });
  });

  // === STATE TRACKING ===
  const revealedCities = new Set<string>();
  const revealedCorridors = new Set<string>();
  const activeCorridorsList: Corridor[] = [];

  /**
   * Get line series based on corridor type
   */
  const getLineSeries = (type: Corridor["type"]) => {
    switch (type) {
      case "major":
        return majorLineSeries;
      case "regional":
        return regionalLineSeries;
      case "micro":
        return microLineSeries;
    }
  };

  /**
   * Add city with elegant animation
   */
  const addCity = (city: CityHub) => {
    if (revealedCities.has(city.id)) return;
    revealedCities.add(city.id);

    const dataItem = pointSeries.pushDataItem({
      geometry: { type: "Point", coordinates: [city.longitude, city.latitude] },
      name: city.name,
      latitude: city.latitude.toFixed(4),
      longitude: city.longitude.toFixed(4),
    });

    // Scale-in animation
    if (dataItem.bullets?.[0]?.get("sprite")) {
      const sprite = dataItem.bullets[0].get("sprite");
      sprite.set("scale", 0);
      sprite.animate({
        key: "scale",
        to: city.isMainHub ? 1.2 : 0.9,
        duration: 600,
        easing: am5.ease.out(am5.ease.elastic),
      });
    }
  };

  /**
   * Add corridor with drawing animation
   */
  const addCorridor = (corridor: Corridor) => {
    const key = `${corridor.from}-${corridor.to}`;
    if (revealedCorridors.has(key)) return;
    revealedCorridors.add(key);
    activeCorridorsList.push(corridor);

    const fromCity = cityHubs.find((c) => c.id === corridor.from);
    const toCity = cityHubs.find((c) => c.id === corridor.to);
    if (!fromCity || !toCity) return;

    const lineObj = {
      geometry: {
        type: "LineString",
        coordinates: [
          [fromCity.longitude, fromCity.latitude],
          [toCity.longitude, toCity.latitude],
        ],
      },
    };

    // Add to appropriate layer
    const series = getLineSeries(corridor.type);
    series.data.push(lineObj);

    // Add glow for major corridors
    if (corridor.type === "major") {
      glowSeries.data.push({ ...lineObj });
    }

    // Add pulse animation line
    pulseSeries.pushDataItem({ ...lineObj });

    // Animate the pulse
    setTimeout(() => {
      pulseSeries.mapLines.each((line: any) => {
        if (!line._pulsing) {
          line._pulsing = true;
          line.animate({
            key: "strokeDashoffset",
            from: 0,
            to: -22,
            duration: 1200,
            loops: Infinity,
          });
        }
      });
    }, 50);

    // Animate a package along this new corridor
    animatePackageOnCorridor(corridor);
  };

  /**
   * Animate package along a specific corridor
   */
  const animatePackageOnCorridor = (corridor: Corridor) => {
    const from = cityHubs.find((c) => c.id === corridor.from);
    const to = cityHubs.find((c) => c.id === corridor.to);
    if (!from || !to) return;

    const pkg = packageSeries.pushDataItem({
      geometry: { type: "Point", coordinates: [from.longitude, from.latitude] },
    });

    const duration =
      corridor.type === "major"
        ? 2500
        : corridor.type === "regional"
          ? 2000
          : 1500;

    pkg.animate({
      key: "longitude",
      to: to.longitude,
      duration,
      easing: am5.ease.inOut(am5.ease.quad),
    });

    pkg.animate({
      key: "latitude",
      to: to.latitude,
      duration,
      easing: am5.ease.inOut(am5.ease.quad),
    });

    setTimeout(() => {
      packageSeries.data.removeValue(pkg.dataContext);
    }, duration + 200);
  };

  /**
   * Reveal phase with staggered animations
   */
  const revealPhase = (phase: number, delay: number = 0) => {
    const phaseCities = cityHubs.filter((c) => c.phase === phase);
    const phaseCorridors = corridors.filter((c) => c.phase === phase);

    // Cities first with stagger
    phaseCities.forEach((city, i) => {
      setTimeout(() => addCity(city), delay + i * 150);
    });

    // Then corridors with stagger
    const corridorDelay = delay + phaseCities.length * 150 + 200;
    phaseCorridors.forEach((corridor, i) => {
      setTimeout(() => addCorridor(corridor), corridorDelay + i * 200);
    });
  };

  /**
   * Continuous package flow on active network
   */
  const startPackageFlow = () => {
    const interval = setInterval(() => {
      if (activeCorridorsList.length === 0) return;

      // Pick 3-5 random corridors
      const count = 3 + Math.floor(Math.random() * 3);
      const shuffled = [...activeCorridorsList].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(count, shuffled.length));

      selected.forEach((corridor, i) => {
        setTimeout(() => {
          // Sometimes go reverse direction
          if (Math.random() > 0.5) {
            const reversed = {
              ...corridor,
              from: corridor.to,
              to: corridor.from,
            };
            animatePackageOnCorridor(reversed);
          } else {
            animatePackageOnCorridor(corridor);
          }
        }, i * 300);
      });
    }, 2500);

    animationIntervals.push(interval);
  };

  /**
   * Start the network expansion sequence
   * Map starts zoomed in on Germany - gradually zooms out as network expands
   */
  const startExpansion = () => {
    // Phase 0: Aachen origin (immediate)
    revealPhase(0, 0);

    // Phase 1: NRW spread (after 800ms)
    setTimeout(() => {
      revealPhase(1, 0);
      // Slight zoom out to show NRW region
      chart.zoomToGeoPoint({ latitude: 51.2, longitude: 7.5 }, 5.0, true, 2000);
    }, 800);

    // Phase 2: Germany expansion (after 4s) - zoom out to show all Germany
    setTimeout(() => {
      revealPhase(2, 0);
      chart.zoomToGeoPoint(
        { latitude: 51.0, longitude: 10.0 },
        4.0,
        true,
        2500,
      );
    }, 4000);

    // Phase 3: Benelux connections (after 8s) - zoom out to show Europe
    setTimeout(() => {
      revealPhase(3, 0);
      chart.zoomToGeoPoint({ latitude: 50.5, longitude: 7.0 }, 3.2, true, 2500);
    }, 8000);

    // Start continuous package flow after network is built
    setTimeout(startPackageFlow, 12000);
  };

  // Initialize
  chart.appear(1000, 100);
  setTimeout(startExpansion, 300);
};

/**
 * Cleanup
 */
export const disposeCorridorMap = (): void => {
  animationIntervals.forEach((interval) => clearInterval(interval));
  animationIntervals = [];

  if (mapRoot) {
    mapRoot.dispose();
    mapRoot = null;
  }
};
