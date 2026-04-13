export const getTotalBudgetPerMember = (roles: any[] = []) => {
  return roles.reduce((total, role) => {
    const roleBudget = role?.budgets?.reduce(
      (sum: number, budget: any) => sum + (budget?.budgetPerMember || 0),
      0
    ) || 0;

    return total + roleBudget;
  }, 0);
};
