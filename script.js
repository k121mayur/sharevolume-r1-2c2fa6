const fetchData = async (cik) => {
    const response = await fetch(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/dei/EntityCommonStockSharesOutstanding.json`, {
        headers: { 'User-Agent': 'Your-Descriptive-User-Agent' }
    });
    const data = await response.json();
    return data;
};

const updateDOM = (data) => {
    const entityName = data.entityName;
    document.title = entityName;
    document.getElementById('share-entity-name').innerText = entityName;
    document.getElementById('share-max-value').innerText = data.max.val;
    document.getElementById('share-max-fy').innerText = data.max.fy;
    document.getElementById('share-min-value').innerText = data.min.val;
    document.getElementById('share-min-fy').innerText = data.min.fy;
};

const init = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cik = urlParams.get('CIK') || '0001037540';
    const data = await fetchData(cik);
    updateDOM(data);
};

init();