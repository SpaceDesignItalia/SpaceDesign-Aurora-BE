class PermissionModel {
  static async getAllPermissionsGroups(db) {
    try {
      const queryResult = await db.query("SELECT * FROM Group");
      return queryResult.rows;
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw new Error("Error fetching permissions");
    }
  }
}

module.exports = PermissionModel;
