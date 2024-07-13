// const yamlData = `
// Total Budget: 1000000
// Operations: 400000
//     Salaries: 200000
//         Management: 100000
//         Staff: 100000
//     Office Supplies: 50000
//         Stationery: 20000
//         Equipment: 30000
//     Utilities: 100000
//         Electricity: 60000
//         Water: 20000
//         Internet: 20000
//     Maintenance: 50000
//         Building Maintenance: 30000
//         Equipment Maintenance: 20000
// Marketing: 150000
//     Advertising: 70000
//         Online Ads: 40000
//         Print Ads: 30000
//     Promotions: 50000
//         Discounts: 30000
//         Events: 20000
//     Market Research: 30000
//         Surveys: 15000
//         Focus Groups: 15000
// Research and Development: 200000
//     Product Development: 150000
//         New Products: 100000
//         Product Improvements: 50000
//     Innovation: 50000
//         Technology: 30000
//         Processes: 20000
// Sales: 100000
//     Sales Team Salaries: 60000
//         Senior Sales: 30000
//         Junior Sales: 30000
//     Travel Expenses: 20000
//     Client Entertainment: 20000
// Human Resources: 50000
//     Recruitment: 20000
//         Job Advertisements: 10000
//         Recruitment Agencies: 10000
//     Training and Development: 30000
//         Workshops: 15000
//         Online Courses: 15000
// IT: 100000
//     Hardware: 40000
//         Computers: 25000
//         Servers: 15000
//     Software: 30000
//         Licenses: 20000
//         Subscriptions: 10000
//     IT Support: 30000
//         Internal Support: 20000
//         External Services: 10000
// Miscellaneous: 50000
//     Legal Fees: 20000
//     Insurance: 30000
// `;

// function parseYAML(yaml) {
//     const lines = yaml.split('\n').filter(line => line.trim() !== '');
//     const result = {};
//     const stack = [{ obj: result, indent: -1 }];

//     lines.forEach(line => {
//         const indent = line.search(/\S/);
//         const [key, value] = line.trim().split(/:\s*(.*)/);
//         const parsedValue = value === undefined ? {} : isNaN(value) ? value : Number(value);

//         while (stack[stack.length - 1].indent >= indent) {
//             stack.pop();
//         }

//         const parent = stack[stack.length - 1].obj;
//         parent[key] = parsedValue;
//         stack.push({ obj: parent[key], indent });
//     });

//     return result;
// }

// const parsedData = parseYAML(yamlData);
// console.log(JSON.stringify(parsedData, null, 2));
