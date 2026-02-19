import { fetchParentCategories } from "@/actions/fetchParentCategory";
import { useQuery } from "@tanstack/react-query"

export const useFetchCategories = () => {
    return useQuery({
        queryKey: ["parentCategory"],
        queryFn: async () => {
          const res = await fetchParentCategories();
          if (res.success) {
            return res.result;
          } else {
            throw new Error("Couldn't fetch listing");
          }
    
        },
        staleTime: 2 * 60 * 1000
    
      })
}