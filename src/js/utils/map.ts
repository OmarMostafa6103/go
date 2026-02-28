/* eslint-disable @typescript-eslint/no-explicit-any */
declare const am5: any;
declare const am5map: any;
declare const am5geodata_worldLow: any;
declare const am5themes_Animated: any;
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * @file map.ts
 * @description Interactive 3D Globe with location markers and tooltips
 * @version 1.0.0
 * @uses amCharts 5 (external library loaded via CDN)
 *
 * === FEATURES ===
 * - Interactive 3D globe visualization
 * - Animated location markers
 * - Tooltips with location details
 * - Custom styling and hover effects
 * - Auto-zoom to fit all locations
 * - Mouse controls (rotate, zoom, pan)
 *
 * === LOCATION DATA ===
 * Each location includes:
 * - id: Unique identifier
 * - name: Display name
 * - address: Full address
 * - latitude: Geographic latitude
 * - longitude: Geographic longitude
 * - flag: Emoji flag for visual indication
 *
 * === HTML SETUP ===
 *
 * ```html
 * <!-- Container for globe -->
 * <div id="chartdiv" style="width: 100%; height: 600px;"></div>
 *
 * <!-- Include amCharts libraries -->
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.10.38/index.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.10.38/xy.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.10.38/map.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.10.38/geodata/worldLow.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.10.38/themes/Animated.js"></script>
 * ```
 *
 * === TYPESCRIPT USAGE ===
 *
 * ```typescript
 * import { initGlobe, disposeGlobe } from '@/utils/map';
 *
 * // Initialize on page load
 * document.addEventListener('DOMContentLoaded', () => {
 *   initGlobe();
 * });
 *
 * // Clean up on page unload
 * window.addEventListener('beforeunload', () => {
 *   disposeGlobe();
 * });
 * ```
 *
 * === CUSTOMIZATION ===
 *
 * Modify the locations array to change displayed locations.
 * Colors can be adjusted in the marker styling section.
 */

/**
 * Location data structure for globe markers
 * @interface Location
 */
interface Location {
  /** Unique identifier for the location */
  id: string;
  /** Display name of the location */
  name: string;
  /** Full address */
  address: string;
  /** Geographic latitude (-90 to 90) */
  latitude: number;
  /** Geographic longitude (-180 to 180) */
  longitude: number;
  /** Emoji flag for visual identification */
  flag: string;
}

/**
 * List of all locations to display on the globe
 * @type {Location[]}
 */
const locations: Location[] = [
  {
    id: "melbourne",
    name: "Melbourne, AUS",
    address: "100 Smith Street, Collingwood VIC 3066 AU",
    latitude: -37.8136,
    longitude: 144.9631,
    flag: "🇦🇺",
  },
  {
    id: "new-york",
    name: "New York, USA",
    address: "123 Broadway, New York, NY 10001",
    latitude: 40.7128,
    longitude: -74.006,
    flag: "🇺🇸",
  },
  {
    id: "london",
    name: "London, UK",
    address: "456 Oxford Street, London W1D 1BS",
    latitude: 51.5074,
    longitude: -0.1278,
    flag: "🇬🇧",
  },
  {
    id: "singapore",
    name: "Singapore",
    address: "789 Orchard Road, Singapore 238839",
    latitude: 1.3521,
    longitude: 103.8198,
    flag: "🇸🇬",
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    address: "Sheikh Zayed Road, Dubai, UAE",
    latitude: 25.2048,
    longitude: 55.2708,
    flag: "🇦🇪",
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    address: "1-1-1 Shibuya, Tokyo 150-0002",
    latitude: 35.6762,
    longitude: 139.6503,
    flag: "🇯🇵",
  },
  {
    id: "sao-paulo",
    name: "São Paulo, Brazil",
    address: "Av. Paulista, 1000, São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
    flag: "🇧🇷",
  },
  {
    id: "moscow",
    name: "Moscow, Russia",
    address: "Red Square, Moscow 109012",
    latitude: 55.7558,
    longitude: 37.6173,
    flag: "🇷🇺",
  },
];

/**
 * Initialize and render the interactive globe
 * Sets up amCharts 5 with world map, location markers, and animations
 *
 * @throws {void} - Logs error if amCharts library not loaded
 * @returns {void}
 *
 * @example
 * ```typescript
 * import { initGlobe } from '@/utils/map';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initGlobe();
 * });
 * ```
 *
 * Requirements:
 * - HTML element with id="chartdiv"
 * - amCharts 5 libraries loaded via script tags
 */
export const initGlobe = (): void => {
  // Check if container exists (only on index.html)
  const container = document.getElementById("chartdiv");
  if (!container) {
    return;
  }

  // Check if amCharts is loaded
  if (typeof am5 === "undefined") {
    console.error("amCharts library not loaded");
    return;
  }

  // Create root element
  const root = am5.Root.new("chartdiv");

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Create the map chart
  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: am5map.geoOrthographic(),
      panX: "rotateX",
      panY: "rotateY",
    }),
  );

  // Create main polygon series for countries
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    }),
  );

  // Configure polygon appearance
  polygonSeries.mapPolygons.template.setAll({
    fill: am5.color(0xe5e7eb), // Light gray
    fillOpacity: 0.5,
    strokeWidth: 0.5,
    stroke: am5.color(0xffffff),
  });

  // Add hover effect
  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(0x9e77ed), // Primary light color
    fillOpacity: 0.8,
  });

  // Create point series for locations
  const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

  // Configure point appearance
  pointSeries.bullets.push(() => {
    const container = am5.Container.new(root, {});

    // Outer pulse circle
    const outerCircle = container.children.push(
      am5.Circle.new(root, {
        radius: 8,
        fill: am5.color(0x6941c6), // Primary color
        fillOpacity: 0.3,
        strokeOpacity: 0,
      }),
    );

    // Animate pulse
    outerCircle.animate({
      key: "scale",
      from: 1,
      to: 2,
      duration: 2000,
      loops: Infinity,
      easing: am5.ease.out(am5.ease.cubic),
    });

    outerCircle.animate({
      key: "opacity",
      from: 0.6,
      to: 0,
      duration: 2000,
      loops: Infinity,
      easing: am5.ease.out(am5.ease.cubic),
    });

    // Inner circle
    const innerCircle = container.children.push(
      am5.Circle.new(root, {
        radius: 6,
        fill: am5.color(0x6941c6), // Primary color
        strokeWidth: 3,
        stroke: am5.color(0x9e77ed), // Primary light
        tooltipText: "{name}\n{address}",
        cursorOverStyle: "pointer",
      }),
    );

    // Hover effect
    innerCircle.states.create("hover", {
      scale: 1.4,
    });

    return am5.Bullet.new(root, {
      sprite: container,
    });
  });

  // Add location data
  const locationData = locations.map((loc) => ({
    geometry: {
      type: "Point",
      coordinates: [loc.longitude, loc.latitude],
    },
    name: `${loc.flag} ${loc.name}`,
    address: loc.address,
  }));

  pointSeries.data.setAll(locationData);

  // Create graticule series (grid lines)
  const graticuleSeries = chart.series.unshift(
    am5map.GraticuleSeries.new(root, {
      step: 10,
    }),
  );

  graticuleSeries.mapLines.template.setAll({
    stroke: am5.color(0xd1d5db),
    strokeOpacity: 0.3,
  });

  // Add background
  chart.chartContainer.get("background")?.setAll({
    fill: am5.color(0xffffff),
    fillOpacity: 0,
  });

  // Enable rotation animation
  chart.animate({
    key: "rotationX",
    from: 0,
    to: 360,
    duration: 30000,
    loops: Infinity,
  });

  // Make chart appear animated on load
  chart.appear(1000, 100);
};

/**
 * Cleanup function - dispose of globe and free memory
 * Removes amCharts root element and all associated resources
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * // On page unload or navigation
 * window.addEventListener('beforeunload', () => {
 *   disposeGlobe();
 * });
 * ```
 */
export const disposeGlobe = (): void => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const root = am5.registry.rootElements.find(
    (r: any) => r.dom.id === "chartdiv",
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
  if (root) {
    root.dispose();
  }
};
