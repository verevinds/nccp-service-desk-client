export const paramsIncident = (user) => {
  let responsibles = user?.position?.responsibles;
  let arrayCategoryId = [];
  let arrayPropertyId = [];
  let arrayOptionId = [];
  if (Array.isArray(responsibles))
    responsibles.forEach((item) => {
      if (item.categoryId) arrayCategoryId.push(item.categoryId);
      if (item.propertyId) arrayPropertyId.push(item.propertyId);
      if (item.optionId) arrayOptionId.push(item.optionId);
    });
  arrayCategoryId = Array.from(new Set(arrayCategoryId));
  arrayPropertyId = Array.from(new Set(arrayPropertyId));
  arrayOptionId = Array.from(new Set(arrayOptionId));
  let params = { departmentId: user?.departmentId, allowToCreate: true, hasVisa: true };

  if (arrayCategoryId.length > 0) Object.assign(params, { arrayCategoryId: JSON.stringify(arrayCategoryId) });
  if (arrayPropertyId.length > 0) Object.assign(params, { arrayPropertyId: JSON.stringify(arrayPropertyId) });
  if (arrayOptionId.length > 0) Object.assign(params, { arrayOptionId: JSON.stringify(arrayOptionId) });
  return params;
};
