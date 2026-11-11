(function () {
  'use strict';
  const grid = document.getElementById('weekly-weather-days');
  const status = document.getElementById('weekly-weather-status');
  const refresh = document.getElementById('weekly-weather-refresh');
  if (!grid || !status || !refresh) return;

  // Seoul city center; local dates are returned in Asia/Seoul.
  const endpoint = 'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul&forecast_days=7';
  const weekdayNames = ['週日','週一','週二','週三','週四','週五','週六'];

  function description(code) {
    if (code === 0) return ['☀️','晴朗'];
    if (code === 1 || code === 2) return ['🌤️','晴時多雲'];
    if (code === 3) return ['☁️','陰天'];
    if (code === 45 || code === 48) return ['🌫️','有霧'];
    if ([51,53,55,56,57].includes(code)) return ['🌦️','毛毛雨'];
    if ([61,63,65,66,67].includes(code)) return ['🌧️','下雨'];
    if ([71,73,75,77].includes(code)) return ['❄️','下雪'];
    if ([80,81,82].includes(code)) return ['🌦️','陣雨'];
    if (code === 85 || code === 86) return ['🌨️','陣雪'];
    if ([95,96,99].includes(code)) return ['⛈️','雷雨'];
    return ['🌥️','多雲'];
  }

  function temperature(value) {
    return Number.isFinite(value) ? Math.round(value) + '°' : '—';
  }

  async function updateWeather() {
    refresh.disabled = true;
    status.textContent = '正在更新首爾天氣…';
    const abort = new AbortController();
    const timer = setTimeout(function () { abort.abort(); }, 12000);
    try {
      const response = await fetch(endpoint, { signal: abort.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('Weather request failed');
      const responseData = await response.json();
      const daily = responseData.daily;
      const fields = ['weather_code','temperature_2m_max','temperature_2m_min','precipitation_probability_max'];
      if (!daily || !Array.isArray(daily.time) || daily.time.length !== 7 ||
        !fields.every(function (key) { return Array.isArray(daily[key]) && daily[key].length === 7; })) {
        throw new Error('Incomplete forecast data');
      }
      const cards = daily.time.map(function (date, i) {
        if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date');
        const day = new Date(date + 'T12:00:00+09:00');
        const weekday = weekdayNames[day.getUTCDay()] || '';
        const condition = description(daily.weather_code[i]);
        const probability = daily.precipitation_probability_max[i];
        const rain = Number.isFinite(probability) ? Math.round(probability) + '%' : '—';
        const tripDay = date >= '2026-11-12' && date <= '2026-11-16';
        const cardClass = (i === 0 ? ' is-today' : '') + (tripDay ? ' is-trip' : '');
        return '<article class="weekly-weather-day' + cardClass + '" role="listitem">' +
          '<div class="weekly-weather-date">' + date.slice(5).replace('-', '/') + '</div>' +
          '<div class="weekly-weather-weekday">' + (i === 0 ? '今天 · ' : '') + weekday + '</div>' +
          (tripDay ? '<div class="weekly-weather-trip">🍁 旅行日</div>' : '') +
          '<div class="weekly-weather-icon" aria-hidden="true">' + condition[0] + '</div>' +
          '<div class="weekly-weather-condition">' + condition[1] + '</div>' +
          '<div class="weekly-weather-temperatures"><strong>' + temperature(daily.temperature_2m_max[i]) + '</strong><span>' + temperature(daily.temperature_2m_min[i]) + '</span></div>' +
          '<div class="weekly-weather-rain">☂ 降雨 ' + rain + '</div>' +
          '</article>';
      });
      grid.innerHTML = cards.join('');
      const nowKorea = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Seoul', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date());
      status.textContent = '更新於 ' + nowKorea + '（韓國時間）';
    } catch (error) {
      grid.innerHTML = '<div class="weekly-weather-empty" role="listitem">暫時無法載入天氣預報。請確認網路連線，或按「更新預報」再試一次。</div>';
      status.textContent = '預報暫時無法取得';
    } finally {
      clearTimeout(timer);
      refresh.disabled = false;
    }
  }

  refresh.addEventListener('click', updateWeather);
  updateWeather();
})();
