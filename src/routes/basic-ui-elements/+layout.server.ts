import MockData from './data';


export const load = () => {
  return {
    elements: MockData.uiElements.map((element) => ({
      slug: element.slug,
      title: element.title,
    })),
  };
}
