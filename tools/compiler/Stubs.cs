// Minimal stand-ins for the autocomplete UI types, which need WinForms.
namespace DarkScript3
{
    public static class DocAutocomplete
    {
        public class DocAutocompleteItem : System.IComparable<DocAutocompleteItem>
        {
            public int CompareTo(DocAutocompleteItem other) => 0;
        }
    }
}
